import { Search, Filter } from "lucide-react";

function SearchBar({
    search,
    setSearch,
    statusFilter,
    setStatusFilter
}) {

    return (

        <div className="flex justify-between items-center mb-8">

            {/* Search */}

            <div className="relative w-96">

                <Search
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                />

                <input

                    type="text"

                    placeholder="Search candidates..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="
                    w-full
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    py-3
                    pl-12
                    pr-4
                    text-white
                    placeholder-gray-500
                    focus:outline-none
                    focus:border-cyan-400
                    "

                />

            </div>

            {/* Filter */}

            <div className="flex items-center gap-3">

                <Filter
                    className="text-cyan-400"
                    size={20}
                />

                <select

                    value={statusFilter}

                    onChange={(e) => setStatusFilter(e.target.value)}

                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    focus:outline-none
                    focus:border-cyan-400
                    "

                >

                    <option>All</option>

                    <option>Pending</option>

                    <option>Shortlisted</option>

                    <option>Rejected</option>

                </select>

            </div>


        </div>

    );

}

export default SearchBar;