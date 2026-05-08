interface Props {
  results: any[];
  query: string;
}

export function SearchGrid({ results, query }: Props) {
  if (!results.length) {
    return <div className="text-white">No results for {query}</div>;
  }

  return (
    <div className="space-y-4 text-white">
      {results.map((item) => (
        <div key={item.id}>{item.title || item.name}</div>
      ))}
    </div>
  );
}
