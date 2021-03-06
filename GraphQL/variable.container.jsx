//...
const GET_COLLECTIONS_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!) {
        getCollectionsByTitle(title: $title) {
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

const CollectionPageContainer = ({ match }) => {
    <Query
        query={GET_COLLECTIONS_BY_TITLE}
        variables={{
            title: match.params.collectionId,
        }}
    >
        {({ loading, data: { getCollectionsByTitle } }) => {
            if (loading) return <Spinner />;
            return <CollectionPage collection={getCollectionsByTitle} />;
        }}
    </Query>;
};
