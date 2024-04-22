import { useState } from 'react'


// const parth = {
//   name: "parth",
//   age: 23,
//   greet: function() {
//     console.log("Hello I am ", this.name)
//   }
// }

// // parth.greet()

// // const greeter_func = parth.greet

// // greeter_func()

// setTimeout(parth.greet.bind(parth), 2000)




// const Hello = (props) => {
//   const name = props.name
//   const age = props.ages

//   // const {age, name} = props
//   const birthyear = () => new Date().getFullYear() - age

//   console.log(name, age)
//   return (
//     <>
//       <p>Hello {name} your age is {age}, so you must be born in {birthyear()}</p>
//     </>
//   )
// }

// const Application = () => {
//   const name = 'Parth'
//   const age = 23

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name={name} ages={age} />
//     </div>
//   )
// }

// export default Application



const Application = () => {
  const [counter, setCounter] = useState(0)
  // setTimeout(
  //   () => {setCounter(counter + 1)},
  //   1000
  // )
  console.log(counter)

  return (
    <div>{counter}</div>
  )
}

export default Application