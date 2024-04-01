

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
