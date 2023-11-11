import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { prettyHstDate } from "@/utils/dateConverter";
import { ISLANDS } from "@/constants/constants";
import Loading from "@/components/Loading";


const DashboardTable = ({ events, isLoading }) => {
  const [islandFilter, setIslandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [removalOrgs, setRemovalOrgs] = useState(null);
  const [updatedEvents, setUpdatedEvents] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('status')) {
      setStatusFilter(searchParams.get('status'));
    }
    if (searchParams.has('sort')) {
      setSort(searchParams.get('sort'));
    }
    if (searchParams.has('island')) {
      setIslandFilter(searchParams.get('island'));
    }
    if (!removalOrgs && events.length) {
      const fetchData = async () => {
        const orgRes = await fetch('/api/mongo/organization/get-organizations');
        setRemovalOrgs(await orgRes.json());
        const threadRes = await fetch('/api/mongo/thread/threads');
        const threads = await threadRes.json();
        for (const event of events) {
          const thread = threads.find((thread) => thread._id === event.threadId);
          console.log(thread);
          event.threadCount = thread?.messages?.length || 0;
        }
        setUpdatedEvents(events);
      };
      fetchData();
    }
  }, [searchParams, events]);

  // Create pill color for status
  function getStatusColor(status) {
    const statusColors = {
      Reported: "bg-yellow-600",
      "Removal and Storage": "bg-blue-800",
      Sorting: "bg-orange-600",
      Disposal: "bg-purple-700",
      Complete: "bg-green-700",
    };
    return statusColors[status] || "bg-gray-500";
  }

  function updateSearchParams(key, value) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  // Filter events based on filter state, date, island
  const filteredEvents = updatedEvents.filter((event) => {
    if (statusFilter && event.status !== statusFilter) {
      return false;
    }
    return !(islandFilter && event.closestIsland !== islandFilter);
  }).sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.reportedDate) - new Date(b.reportedDate);
    } else if (sort === "newest") {
      return new Date(b.reportedDate) - new Date(a.reportedDate);
    } else {
      return 0;
    }
  });

  const removalOrgName = (id) => {
    if (!id) return 'None Assigned';
    if (removalOrgs) {
      return removalOrgs.find((org) => org._id === id).name;
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end space-x-8 mb-6">
        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Status:</label>
          <select
            className="select text-gray-500 bg-gray-100"
            name="status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              updateSearchParams('status', e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Reported">Reported</option>
            <option value="Removal and Storage">Removal and Storage</option>
            <option value="Sorting">Sorting</option>
            <option value="Disposal">Disposal</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Sort by:</label>
          <select
            className="select text-gray-500 bg-gray-100"
            name="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              updateSearchParams('sort', e.target.value);
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Island:</label>
          <select
            className="select text-gray-500 bg-gray-100"
            name="island"
            value={islandFilter}
            onChange={(e) => {
              setIslandFilter(e.target.value);
              updateSearchParams('island', e.target.value);
            }}
          >
            <option value="">All</option>
            {ISLANDS.map((island, index) => <option key={index}>{island}</option>)}
          </select>
        </div>
      </div>

      <section className="flex flex-col gap-3 py-4 px-3 border border-neutral rounded-xl bg-base-200 min-h-[400px]">
        {isLoading
          ? <div className="pt-32">
            <Loading />
          </div>
          : filteredEvents.map((event) => (
            <div key={event._id} className="card card-bordered border-neutral bg-base-100">
              <div className="card-body px-8 py-5">
                <div className="flex justify-between">
                  <div>
                    <Link href={`/event/${event._id}`} className="cursor-pointer hover:opacity-70 transition-all">
                      <div className="flex">
                        <h1 className="text-md md:text-xl font-bold">{event.closestIsland || 'Other'} : {event.publicType}</h1>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 md:w-6 md:h-6 ml-2 pt-1" />
                      </div>
                      <div className="text-sm md:text-md">
                        <time className="my-3">{prettyHstDate(event.reportedDate)}</time>
                        <div className="pt-2">
                          <div>
                            <span className="font-semibold">Description:</span> {event.publicLocationDesc}
                          </div>
                          <div>
                            <span className="font-semibold">Removal Org:</span> {removalOrgName(event.removalOrgId)}
                          </div>
                          <div>
                            <span className="font-semibold">Current Location:</span> {event.tempStorage}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link href={`/thread/${event.threadId}`} className="cursor-pointer hover:opacity-70 transition-all text-gray-700 flex mt-2 text-sm">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 me-1" />
                      {event.threadCount} message{event.threadCount === 1 ? '' : 's'}
                    </Link>
                  </div>
                  <div className="ms-auto flex flex-1 flex-col justify-between">
                    <div
                      className={`ms-auto mt-3 h-min w-min rounded-full px-2.5 py-0.5 text-xs text-white text-center font-semibold ${getStatusColor(event.status)}`}
                    >
                      {event.status}
                    </div>
                    <div className="ms-auto flex text-sm">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
};

DashboardTable.propTypes = {
  events: PropTypes.array.isRequired,
};

export default DashboardTable;
