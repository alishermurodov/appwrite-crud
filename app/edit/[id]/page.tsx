"use client"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, useEffect, useState } from "react"

export default function EditPage({ params }: { params: { id: string } }) {

    const [formData, setFormData] = useState({ term: "", interpretation: "" })
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/interpretations/${params.id}`)
                if (!response.ok) {
                    throw new Error("Failedto fetch interpretation.")
                }
                const data = await response.json();
                setFormData({ term: data.interpretation.term, interpretation: data.interpretation.interpretation })
            } catch (error) {
                setError("Failes to load interpretation.")
            }
        }
        fetchData();
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.term || !formData.interpretation) {
            setError("Please fill in all the fields!")
            return;
        };
        setError(null);
        setIsloading(true);

        try {
            const response = await fetch(`/api/interpretations/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update interpretation")
            }
            router.push("/")
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.")
        } finally {
            setIsloading(false)
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-bold my-8'>Edit Interpretation</h1>
            <form onSubmit={handleSubmit} className='flex gap-3 flex-col'>
                <input
                    className='py-1 px-4 border rounded-md'
                    type="text"
                    name='term'
                    placeholder='Term'
                    value={formData.term}
                    onChange={handleInputChange}
                />
                <textarea
                    className='py-1 px-4 border rounded-md resize-none'
                    name="interpretation"
                    rows={4}
                    placeholder='Interpretation'
                    value={formData.interpretation}
                    onChange={handleInputChange}
                >
                </textarea>
                <button
                    className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer'
                    style={{ opacity: isLoading ? '.6' : '1' }}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Interpretation"}
                </button>
            </form>
            {error && <p className='text-red-500 mt-4 text-[14px] font-semibold'>{error}</p>}

        </div>
    )
}