import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
  Grid
} from '@mui/material';
import FilterMenu from 'components/FilterMenu'
import SearchBar from 'components/SearchBar'
import ResultsArea from 'components/ResultsArea'

import Quotes from 'public/quotes.json'


const Home: NextPage = () => {
  const [headerImage, setHeaderImage] = useState("");
  const [quote, setQuote] = useState("");

  const randomHeaderImage = () => {
    var max = 4;
    var min = 1;
    var randomNumber = Math.ceil(Math.random() * (max - min) + min);
    switch (randomNumber) {
      case 1:
        return "/images/1.jpeg";
      case 2:
        return "/images/2.png";
      case 3:
        return "/images/3.jpg";
      case 4:
        return "/images/4.webp";
      default:
        return "/images/1.jpeg";
    }
  }

  const randomQuote = () => {
    var max = Quotes.quotes.length;
    var min = 1;
    var randomNumber = Math.ceil(Math.random() * (max - min) + min);
    return Quotes.quotes.at(randomNumber);
  }

  useEffect(() => {
    setHeaderImage(randomHeaderImage() || "/images/1.jpeg")
    setQuote(randomQuote() || "Rick and Morty");
    return () => {}
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty Characters</title>
        <meta name="description" content="Rick and Morty characters." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header} style={{background: `linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%), url(${headerImage})`}}>
        <p className={styles.headerTitle}>{quote}</p>
        <SearchBar/>
      </header>

      <main className={styles.main}>
        <Grid container item xs={12}>
          <Grid item lg={3} justifyContent="center">
            <FilterMenu/>
          </Grid>
          <Grid item xs={12} sm={12} lg={9} padding={{xs: 0, md: '1rem'}}>
            <ResultsArea/>
          </Grid>
        </Grid>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
