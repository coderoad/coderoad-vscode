import ApolloClient, { InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GQL_URI,
    headers: {
        Authorization: process.env.GQL_AUTH_TOKEN,
    },
    cache: new InMemoryCache(),
    resolvers: {
        Mutation: {
            setStatus: (_root, variables, { cache, getCacheKey }) => {
                // TODO: optimize status setting to act on diffs

                // set local cache
                function set(typename: string, id: string, status: 'ACTIVE' | 'COMPLETE') {
                    const writeId = getCacheKey({ __typename: typename, id })
                    const data = { status }
                    cache.writeData({ id: writeId, data })
                }

                const { progress, position } = variables

                // set level progress & active
                for (const levelId of Object.keys(progress.levels)) {
                    set('Level', levelId, 'COMPLETE')
                }
                set('Level', position.levelId, 'ACTIVE')

                // set stage progress & active
                for (const stageId of Object.keys(progress.stages)) {
                    set('Stage', stageId, 'COMPLETE')
                }
                set('Stage', position.stageId, 'ACTIVE')

                // set step progress & active
                for (const stepId of Object.keys(progress.steps)) {
                    set('Step', stepId, 'COMPLETE')
                }
                set('Step', position.stepId, 'ACTIVE')

                return null
            },
        },
    },
})

export default client