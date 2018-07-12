import faker from 'faker'

export default Array(10)
  .fill()
  .map((_, index) => ({
    id: index,
    title: faker
      .random
      .word(),
    image: 'https://picsum.photos/100/100/?random'
  }))