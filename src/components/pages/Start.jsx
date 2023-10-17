import React, {useState} from 'react';
import Loading from '../functional/Loading';
import Choice from '../functional/Choice';
import Error from '../functional/Error';
import InputForm from '../functional/InputForm';
import { Navigate } from 'react-router-dom';
import logo from './logo.png';
function Start() {
 const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [newGame, setNewGame] = useState(null);
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverConfirmed, setServerConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = () => {
   setLoading(true);
   if (validate()) {
    if (newGame) {
      setServerConfirmed(true);
      setTimeout(() => setLoading(false), 500);
      // fetch('/api/newGame', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ name })
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     setRoom(data.room);
      //     setServerConfirmed(true);
      //   })
      //   .catch(err => {
      //     displayError('Server error, please try again');
      //   });
    }
  } else {
    setTimeout(() => setLoading(false), 500);
    displayError(newGame ? 'Please fill out your name' : 'Please fill out your name and room id');
  }
 };

 const displayError = (message) => {
  setError(true);
  setErrorMessage(message);
  setLoading(false);
  setTimeout(() => {
    setError(false);
    setErrorMessage('');
  }, 3000);
};

 const validate = () => {
  if (newGame) {
    return name !== '';
  } else {
    return name !== '' && room !== '';
  }
};

 const stepBack = () => {
   setStep(step - 1);
 };

 const stepForward = () => {
  setStep(step + 1);
};

 const onChoice = (choice) => {
  const gameChoice = choice === 'new' ? true : false;
  setNewGame(gameChoice);
  stepForward();
};

 const onTyping = (e) => {
   const { name, value } = e.target;
   if (name === 'name') {
     setName(value);
   } else if (name === 'room') {
     setRoom(value);
   }
 };

 if (serverConfirmed) {
  return (
    <Navigate to={`/game?room=${room}&name=${name}`} />
  );
} else {
  switch (step) {
    case 1:
      return <Choice logo={logo} onChoice={onChoice} />;
    case 2:
      return (
        <>
          <Loading loading={loading} />
          <Error display={error} message={errorMessage} />
          <InputForm
            stepBack={stepBack}
            onSubmit={onSubmit}
            onTyping={onTyping}
            newGame={newGame}
            name={name}
            room={room}
          />
        </>
      );
    default:
      return null;
  }
}
}

export default Start;
