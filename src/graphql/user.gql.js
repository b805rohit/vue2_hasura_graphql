import { gql } from 'apollo-server-core'

export const usersQuery=
        gql`
            query users{
                users {
                approved
                cognito_id
                email
                phone
                name
                role_id
                user_data
                }
            }
        `