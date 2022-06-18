import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Register from './Register.js';
import Login from './Login.js';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { register, authorize, validateToken } from '../utils/auth';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [removeCard, setRemoveCard] = React.useState({});
  const [changePopupButtonText, setChangePopupButtonText] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [values, setValues] = React.useState({ email: "", password: "" });

  function handleEditProfileClick() {
    setChangePopupButtonText('Save');
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setChangePopupButtonText('Save');
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setChangePopupButtonText('Save');
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setRemoveCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(data) {
    setChangePopupButtonText('Saving...');
    api
      .editProfile(data)
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    setChangePopupButtonText('Saving...');
    api
      .changeAvatar(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((currentCard) => currentCard._id !== card._id));
      })
      .then(() => {
        setIsConfirmPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((userData) => {
        setCards(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    setChangePopupButtonText('Saving...');
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((user) => {
        if (user) {
          localStorage.setItem('jwt', user.token);
          setIsLoggedIn(true);
          setCurrentUser(email);
          navigate('/');
        } else {
          setIsInfoToolTipPopupOpen(true);
          throw new Error('No token recieved!');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegister({ email, password }) {
    register({ email, password })
      .then((user) => {
        navigate('./signin');
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
      })
      .finally(() => {
        setIsInfoToolTipPopupOpen(true);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    token &&
      validateToken(token)
        .then((res) => {
          setValues(res.data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  function handleLogout() {
    localStorage.removeItem('jwt');
    setValues("");
    setIsLoggedIn(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={values}/>
        <Routes>
          <Route
            path="/signin"
            element={<Login onSubmit={handleLogin} isLoggedIn />}
          />
          <Route
            path="/signup"
            element={<Register onSubmit={handleRegister} isLoggedIn />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        
          <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          buttonText={changePopupButtonText}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={changePopupButtonText}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={changePopupButtonText}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={removeCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoToolTip
          name={'registration'}
          onClose={closeAllPopups}
          status={isRegistered}
          isOpen={isInfoToolTipPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
