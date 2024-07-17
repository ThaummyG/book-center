import axios from 'axios'
import React, { useEffect, useState } from 'react'

function BookList() {
    // let url = `https://openlibrary.org/subjects/children's_books.json`;
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState('title');


    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(`https://openlibrary.org/subjects/children's_books.json`)
            try {
                setBooks(res.data.works)
                console.log(res.data);
                setAllBooks(res.data.works);

            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks()
    }, [])


    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredBooks = allBooks.filter(book => {
            switch (searchType) {
                case 'author':
                    return book.authors.some(author => author.name.toLowerCase().includes(value.toLowerCase()));
                case 'title':
                    return book.title.toLowerCase().includes(value.toLowerCase());
                case 'publish_year':
                    return book.first_publish_year && book.first_publish_year.toString().includes(value);
                default:
                    return true;
            }
        });
        setBooks(filteredBooks);
    };

    const handleSearchType = (e) => {
        setSearchType(e.target.value);
        setSearchTerm('');
        setBooks(allBooks);
    };


   

    return (
        <div className='flex flex-col'>
            <div>
                <select onChange={handleSearchType} value={searchType} >
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="publish_year">Publish Year</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={searchTerm}
                    onChange={e => handleSearch(e.target.value)} />

            </div>
            <div className='grid grid-cols-7 gap-1'>
                {books.map((book, index) => (
                    <div key={index} className='card bg-base-100 w-64 shadow-xl'>
                        <figure>
                            <img className='h-[300px] w-[200px]'
                                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                                alt={book.title} />
                        </figure>

                        <div className="card-body">
                            <h3 className="card-title">{book.title}</h3>
                            <p>Name: {book.authors[0].name}</p>
                            <p>Year: {book.first_publish_year}</p>
                            <div className="card-actions justify-end">
                                <button className="badge badge-outline">Like</button>
                            </div>

                        </div>

                    </div>
                ))}
            </div>


            <div>
                <button>More</button>
            </div>

        </div>

    )
}

export default BookList