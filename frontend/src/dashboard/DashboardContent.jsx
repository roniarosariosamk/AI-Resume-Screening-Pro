import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import CandidateTable from "./CandidateTable";
import { getAllCandidates } from "../services/candidateService";

function DashboardContent() {

    const [candidates, setCandidates] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [favoriteOnly, setFavoriteOnly] = useState(false);



    useEffect(() => {

        loadCandidates();

    }, []);

    const loadCandidates = async () => {

        try {

            const data = await getAllCandidates();

            setCandidates(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    // Search + Status Filter
    const filteredCandidates = candidates.filter((candidate) => {

        const matchesSearch =
            candidate.name.toLowerCase().includes(search.toLowerCase()) ||
            candidate.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            candidate.status === statusFilter;

        const matchesFavorite =
            !favoriteOnly || candidate.favorite === 1;    


        return matchesSearch && matchesStatus && matchesFavorite;

    });

    return (

        <div className="mt-10">

            <SearchBar

                search={search}

                setSearch={setSearch}

                statusFilter={statusFilter}

                setStatusFilter={setStatusFilter}

                favoriteOnly={favoriteOnly}

                setFavoriteOnly={setFavoriteOnly}

            />

            <div className="flex justify-end mt-4">

                <button

                    onClick={() => setFavoriteOnly(!favoriteOnly)}

                    className={`
                        px-5
                        py-2
                        rounded-lg
                        font-semibold
                        transition-all
                        duration-300

                        ${
                            favoriteOnly
                                ? "bg-yellow-400 text-black"
                                : "bg-slate-800 text-white hover:bg-slate-700"
                        }
                   `}

                >

                    {favoriteOnly ? "⭐ Showing Favorites" : "☆ Show Favorites"}

                </button>

            </div>

            <CandidateTable

                candidates={filteredCandidates}

            />

        </div>

    );

}

export default DashboardContent;