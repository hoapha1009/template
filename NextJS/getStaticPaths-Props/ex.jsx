export const getStaticPaths = async () => {
    // lấy data
    const data = await getData();

    // lấy Array Id
    const ids = data.products.map((product) => product.id);

    // Tạo object params từ array
    const pathsWithParams = ids.map((id) => ({
        params: {
            pid: id,
        },
    }));

    return {
        paths: pathsWithParams,
        fallback: false,
    };
};
