import * as CR from 'typings'

// temporary tutorials
import basicTutorial from '../../tutorials/basic'

interface Options {
  resource: string
  params?: any
}

const tutorialsData: { [key: string]: CR.Tutorial } = {
  [basicTutorial.id]: basicTutorial,
}

// TODO: replace with fetch resource
export default async function fetch(options: Options): Promise<any> {
  switch (options.resource) {
    case 'getTutorialsSummary':
      // list of ids with summaries
      let data: { [id: string]: CR.TutorialSummary } = {}
      for (const tutorial of Object.values(tutorialsData)) {
        data[tutorial.id] = tutorial.data.summary
      }
      return data
    case 'getTutorial':
      // specific tutorial by id
      return tutorialsData[options.params.id]
    default:
      throw new Error('Resource not found')
  }
}
