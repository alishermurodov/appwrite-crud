'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation {
  $id: string,
  term: string,
  interpretation: string
}

export default function Home() {
  const [interpretations, setInterpretations] = useState<IInterpretation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(interpretations);


  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpretations")
        if (!response.ok) {
          throw new Error("Failed to fetch interpretations");
        }
        const data = await response.json();
        console.log("data", data);

        setInterpretations(data)
      } catch (error) {
        console.log("Error: ", error);
        setError('failed to load interpretations. Please try reloading the page')
      } finally {
        setIsLoading(false)
      }
    }
    fetchInterpretations();
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/interpretations/${id}`, { method: 'DELETE' });
      setInterpretations((prevInterpretation) =>
        prevInterpretation?.filter(i => i.$id !== id)
      );
    } catch (error) {
      setError("Failed to delete interpretation. Please try again.")
    }
  }

  return (
    <div className="">
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (<p>Loading interpretation...</p>) :
        
        interpretations?.length > 0 ?(<div>
            {
              interpretations?.map((interpretation) =>

              (
                <div key={interpretation.$id} className="p-4 m-2 rounded-md border-b leading-8">
                  <div className="font-bold">{interpretation.term}</div>
                  <div className="">
                    {interpretation.interpretation}
                  </div>
                  <div className="flex gap-4 mt-4 justify-end">
                    <Link
                      className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                      href={`/edit/${interpretation.$id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                      onClick={() => handleDelete(interpretation.$id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>) :
          (<p className="text-[24px] min-h-[60vh] flex items-center justify-center font-semibold">No interpretations</p>)

      }
    </div>
  );
}
