// import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
// import { BarChart } from '@saas-ui/charts'
// import Header from '../components/Header'

// const valueFormatter = (value) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(value)
// }

// export default function CollectionPage() {
//   return (
//     <>
//     <Header/>
//     <Card>
//       <CardHeader pb="0">
//         <Heading as="h4" fontWeight="medium" size="md">
//           Today collection
//         </Heading>
//       </CardHeader>
//       <CardBody>
//         <BarChart
//           data={data}
//           categories={['Revenue']}
//           valueFormatter={valueFormatter}
//           yAxisWidth={80}
//           height="400px"
//         />
//       </CardBody>
//     </Card>
//     </>
//   )
// }

// const data = [
//   {
//     date: 'Jan 1',
//     Revenue: 1475,
//   },
//   {
//     date: 'Jan 8',
//     Revenue: 1936,
//   },
//   {
//     date: 'Jan 15',
//     Revenue: 1555,
//   },
//   {
//     date: 'Jan 22',
//     Revenue: 1557,
//   },
//   {
//     date: 'Jan 29',
//     Revenue: 1977,
//   },
//   {
//     date: 'Feb 5',
//     Revenue: 2315,
//   },
//   {
//     date: 'Feb 12',
//     Revenue: 1736,
//   },
//   {
//     date: 'Feb 19',
//     Revenue: 1981,
//   },
//   {
//     date: 'Feb 26',
//     Revenue: 2581,
//   },
//   {
//     date: 'Mar 5',
//     Revenue: 2592,
//   },
//   {
//     date: 'Mar 12',
//     Revenue: 2635,
//   },
//   {
//     date: 'Mar 19',
//     Revenue: 2074,
//   },
//   {
//     date: 'Mar 26',
//     Revenue: 2984,
//   },
//   {
//     date: 'Apr 2',
//     Revenue: 2254,
//   },
//   {
//     date: 'Apr 9',
//     Revenue: 3159,
//   },
//   {
//     date: 'Apr 16',
//     Revenue: 2804,
//   },
//   {
//     date: 'Apr 23',
//     Revenue: 2602,
//   },
//   {
//     date: 'Apr 30',
//     Revenue: 2840,
//   },
//   {
//     date: 'May 7',
//     Revenue: 3299,
//   },
//   {
//     date: 'May 14',
//     Revenue: 3487,
//   },
//   {
//     date: 'May 21',
//     Revenue: 3439,
//   },
//   {
//     date: 'May 28',
//     Revenue: 3095,
//   },
//   {
//     date: 'Jun 4',
//     Revenue: 3252,
//   },
//   {
//     date: 'Jun 11',
//     Revenue: 4096,
//   },
//   {
//     date: 'Jun 18',
//     Revenue: 4193,
//   },
//   {
//     date: 'Jun 25',
//     Revenue: 4759,
//   },
// ]

import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import { BarChart } from '@saas-ui/charts'
import Header from '../components/Header'
import { useEffect, useState } from 'react';

const valueFormatter = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(value)
}

export default function CollectionPage() {
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    const handleGet = async () => {
      try {
        const res = await fetch("https://movie-booking-mern.vercel.app/api/user/movie", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
          },
        });
        const data = await res.json();
        const collections = data.map(movie => ({
          // Assuming the title field in your movie model represents the collection name
          date: movie.title, // Assuming the date field in your movie model represents the collection date
          Revenue: movie.collections // Adjust this based on your actual data structure
        }));
        setCollectionData(collections);
      } catch (err) {
        console.log(err);
      }
    };

    handleGet();
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <Header/>
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Today collection
          </Heading>
        </CardHeader>
        <CardBody>
          <BarChart
            data={collectionData} // Use the fetched collection data here
            categories={['Revenue']}
            valueFormatter={valueFormatter}
            yAxisWidth={80}
            height="400px"
            colorScheme="#36A2EB"
          />
        </CardBody>
      </Card>
    </>
  )
}
