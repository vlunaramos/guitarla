import { useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'

import { db } from './data/db'

function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0) {
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    }
    else {
      item.quantity = 1
      setCart(prevCar => [...prevCar, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCar => prevCar.filter(guitar => guitar.id != id))
  }

  function increasQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }
  /* 
    useState(() => {
      setData(db)
    }, []) */

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increasQuantity={increasQuantity}
      />
      <main className="container-xl mt-5">

        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {

            data.map((guitar) =>
            (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}

              />)
            )
          }
        </div>

      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
