const resolvers = {
    Query:{
        newConversation: async function(context,args,parent,info){
            if(!context.user){
                throw new AuthenticationError('You do not have permission to view this content')
            }
            
        }
    }
}