import { gql } from "@apollo/client";

export const GET_CHARACTERS_BY_FILTER = gql`
    query Characters($page: Int, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
            info {
                count
                pages
                next
                prev
            }
            results {
                id
                name
                status
                species
                type
                gender
                origin {
                    id
                    name
                }
                location {
                    id
                    name
                }
                image
            }
        }
    }
`;