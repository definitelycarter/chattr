export default {
  Pagination: {
    __resolveType(item: unknown, args: unknown) {
      console.log(item);
      console.log(args);
    },
    count({ count }: { count: number }) {
      return count;
    },
  },
};
