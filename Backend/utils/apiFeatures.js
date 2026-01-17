class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search functionality
  search() {
    if (this.queryStr.keyword) {
      this.query = this.query.find({
        $text: { $search: this.queryStr.keyword },
      });
    }
    return this;
  }

  // Filter functionality
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit","sort"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Handle range filters (price, rating, etc)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Pagination functionality
  pagination(resultsPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }

  // Sort functionality
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
}

export default APIFeatures;
