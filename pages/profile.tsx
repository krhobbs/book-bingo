import { useEffect, useState } from 'react';
import { getUser, getCard, getCardBooks } from '../utils/api-utils';
import Spacer from '../components/ui/Spacer';
import Cards from '../components/cards';
import BingoCard from '../components/bingo-card/bingo-card';
import Head from 'next/head';
import { Box } from 'theme-ui';

export default function Profile(props) {
  const user = props.user;
  const card = props.card;

  if (!user || !card) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>Book Bingo | User Profile</title>
      </Head>
      <Spacer size='6.5rem' />
      <p>Username {props.user.username}</p>
      <p>Password {props.user.password}</p>
      <p>Friends {props.user.friends.toString()}</p>
      <BingoCard card={props.card} />
    </>
  );
}

export async function getStaticProps() {
  const user = await getUser('***REMOVED***');
  const cardId = user.card;
  const card = await getCard(cardId);

  return {
    props: {
      user: user,
      card: card
    },
    revalidate: 1
  };
}


