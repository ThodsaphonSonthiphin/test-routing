import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPaginate from "react-paginate";

const ReactFCComponent: React.FC<{title:string}> = ({children, title}) => {
    return <div title={title}>{children}</div>
}

// Example items, to simulate fetching from another resources.
const myItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items(props:any) {
    return (
        <>
            {props.currentItems &&
                props.currentItems.map((item: number) => (
                    <div>
                        <h3>Item #{item}</h3>
                    </div>
                ))}
        </>
    );
}

function PaginatedItems(props:any) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState<number[]>(myItem);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + props.itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);

        setCurrentItems(myItem.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(myItem.length / props.itemsPerPage));
    }, [itemOffset, props.itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * props.itemsPerPage) % myItem.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems}/>
            <ReactPaginate breakLabel="..."
                           nextLabel="next >"
                           onPageChange={handlePageClick}
                           pageRangeDisplayed={5}
                           pageCount={pageCount}
                           previousLabel="< previous"
                           renderOnZeroPageCount={props => {
                           }}/>
        </>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo}
                     className="App-logo"
                     alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload. </p>
                <a className="App-link"
                   href="https://reactjs.org"
                   target="_blank"
                   rel="noopener noreferrer">
                    Learn React
                    <PaginatedItems itemsPerPage={10}/>
                </a>
            </header>
        </div>
    );
}

export default App;
