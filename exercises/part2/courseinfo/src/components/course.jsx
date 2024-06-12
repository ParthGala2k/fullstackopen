const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
  )
}

const Content = ({ content }) => {
  const total = content.reduce((sum, curr) => sum + curr.exercises, 0)
  return (
    <div>
      {content.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <b>Total exercises {total}</b>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

export default Course