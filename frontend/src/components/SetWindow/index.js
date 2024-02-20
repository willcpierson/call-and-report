import SetItem from "../SetItem";
import { useEffect, useState } from 'react';

const SetWindow = () => {

    const [sets, setSets] = useState([]);

    async function findSets() {
        let res = await fetch('https://api.start.gg/gql/alpha', {
            method: 'POST',
            headers: {
              Authorization: process.env.REACT_APP_STARTGG_API_KEY
            },
            body: 
              JSON.stringify({
                  "query": "query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {\n  event(id: $eventId) {\n    id\n    name\n    sets(\n      page: $page\n      perPage: $perPage\n      sortType: STANDARD\n    ) {\n      pageInfo {\n        total\n      }\n      nodes {\n        id\n        slots {\n          id\n          entrant {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n},",
                  "variables": {"eventId": "1074114", "page": 1, "perPage": 50},
                  "operationName": "EventSets"
              })
          });
        let fetchedData = await res.json();
        console.log(fetchedData)
        const setsArray = fetchedData.data.event.sets.nodes
        console.log(setsArray)
        setSets(setsArray)
    };

    const handleFindSets = (e) => {
        e.preventDefault();
        findSets();
    };

    const mappedSets = sets.map((set) => {
        if (set.slots[0].entrant !== null && set.slots[1].entrant !== null) {
            console.log(set.slots[0].entrant)
            return <SetItem players={set.slots} />
        }
     });

    return (
        <div>
            <h1>Hello from Set Window</h1>
            <button onClick={handleFindSets}>Find Sets In Console</button>
            {mappedSets}
        </div>
    )

};

export default SetWindow;