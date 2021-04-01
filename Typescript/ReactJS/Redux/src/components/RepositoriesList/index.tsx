import React, { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const RepositoriesList = () => {
    const [term, setTerm] = useState<string>("");
    const { searchRepositories } = useActions();
    const { loading, data, error } = useTypedSelector(
        (state) => state.repositories
    );

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        searchRepositories(term);
    };

    return (
        <form onSubmit={onSubmit}>
            <input value={term} onChange={(e) => setTerm(e.target.value)} />
            <button>Search</button>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {!error && !loading && data && (
                <ul>
                    {data.map((ele, index) => {
                        return <li key={index}>{ele}</li>;
                    })}
                </ul>
            )}
        </form>
    );
};

export default RepositoriesList;
