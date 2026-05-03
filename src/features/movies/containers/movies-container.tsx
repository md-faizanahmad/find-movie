"use client";

import { useState } from "react";
import { FilterTabs } from "../components/filter-tabs";
import MovieCardSkeleton from "@/shared/skeleton/movie-card-skeleton";
import { Movie } from "@/@types/movie.types";
import { MovieCategory } from "@/@types/movie-category.types";
import { MovieCard } from "../components/movie-card";

interface MoviesContainerProps {
  initialMovies: Movie[];
}

export function MoviesContainer({ initialMovies }: MoviesContainerProps) {
  const [category, setCategory] = useState<MovieCategory>("trending");
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState(false);

  async function fetchMovies(nextCategory: MovieCategory) {
    try {
      setLoading(true);
      setCategory(nextCategory);

      const res = await fetch(`/api/movies?category=${nextCategory}`, {
        cache: "no-store",
      });

      const data = await res.json();
      setMovies(data.data.results ?? []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <FilterTabs active={category} onChange={fetchMovies} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
