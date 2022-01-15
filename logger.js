export default function withLogger(reducer){
    return (prevState,action,args) => {
        // console.log('===============================')
        // console.log('Action: ' , action)
        // console.log('PrevState: ' , prevState)
        // console.log('arguments: ' , args)
             const nextState = reducer(prevState,action,args);
        // console.log('Next State: ' ,nextState)
        // console.log('===============================')
        return nextState
    }
}