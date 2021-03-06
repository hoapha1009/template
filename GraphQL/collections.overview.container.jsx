import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Spinner from "../spinner/spinner.component";
import CollectionsOverview from "./collections-overview.component";

// dùng hàm gql để lấy collection
const GET_COLLECTIONS = gql`
    {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionsOverviewContainer = () => {
    return (
        // dùng Query component truyền query để xử lý
        <Query query={GET_COLLECTIONS}>
            {({ loading, data }) => {
                if (loading) return <Spinner />;
                return <CollectionsOverview collections={data.collections} />;
            }}
        </Query>
    );
};

export default CollectionsOverviewContainer;
