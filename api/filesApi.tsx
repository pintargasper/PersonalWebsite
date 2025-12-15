const fetchImage: (fileName: string) => string = (fileName: string): string => {
    return `${process.env.NEXT_PUBLIC_IMAGES_API_URL!}/${fileName}`;
};

export {
    fetchImage
};
