import Vue from 'vue'
import Vuex from 'vuex'
import { apolloClient } from '../vue-apollo'
import { usersQuery } from '../graphql/user.gql'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{data:[],loading:false,error:null},
  },
  mutations: {
    setLoadingState(state,param){
      Vue.set(state[param.entity],'loading',param.value)
    },
    fetchUsers(state,data){
      Vue.set(state.user,'data',data)
    },
    setError(state,param){
      Vue.set(state[param.entity],'error',param.message)
    }
  },
  getters:{
    getUsers:(state)=>state.user
  },
  actions: {
    async fetchUsers({commit}){
      commit('setLoadingState',{entity:'user',value:true})
      try{
        const {data}= await apolloClient.query({
          query:usersQuery
        })
        commit('fetchUsers',data.users)
        commit('setLoadingState',{entity:'user',value:false})
      }
      catch(error){
        commit('setLoadingState',{entity:'user',value:false})
        commit('setError',{entity:'user',message:error.message})
      }
    }
  },
  modules: {
  }
})
