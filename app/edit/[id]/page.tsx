export default function EditPage() {
    return (
        <div>
            <h1 className='text-2xl font-bold my-8'>Edit Interpretation</h1>
            <form className='flex gap-3 flex-col'>
                <input
                    className='py-1 px-4 border rounded-md'
                    type="text"
                    name='term'
                    placeholder='Term'
                />
                <textarea
                    className='py-1 px-4 border rounded-md resize-none'
                    name="Interpretation"
                    rows={4}
                    placeholder='Interpretation'
                >
                </textarea>
                <button
                    className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer'
                >
                    Update Interpretation
                </button>
            </form>
        </div>
    )
}