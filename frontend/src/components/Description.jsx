const Description = () => {
  return (
    <div className="problem-content">
      <div className="title">
        <h1>Recyclable and Low Fat Products</h1>
      </div>

      <div className="tags">
        <span className="tag easy">Easy</span>
        <span className="tag">Companies</span>
      </div>

      <div className="breif-description">
        <p>
          Write an SQL query to find the ids of products that are both low fat
          and recyclable.
        </p>

        <h3>Table: Products</h3>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>product_id</td>
                <td>int</td>
              </tr>
              <tr>
                <td>low_fats</td>
                <td>enum ('Y','N')</td>
              </tr>
              <tr>
                <td>recyclable</td>
                <td>enum ('Y','N')</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          product_id is the primary key (column with unique values) for this
          table.
        </p>

        <p>
          low_fats is an ENUM of type ('Y', 'N') where 'Y' means this product is
          low fat and 'N' means it is not.
        </p>

        <p>
          recyclable is an ENUM of type ('Y', 'N') where 'Y' means this product
          is recyclable and 'N' means it is not.
        </p>

        <h3>Example 1:</h3>

        <p>
          <strong>Input:</strong>
        </p>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>product_id</th>
                <th>low_fats</th>
                <th>recyclable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>Y</td>
                <td>N</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Y</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>2</td>
                <td>N</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Y</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>4</td>
                <td>N</td>
                <td>N</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Output:</strong>
        </p>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>product_id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
              </tr>
              <tr>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Explanation:</strong> Only products 1 and 3 are both low fat
          and recyclable.
        </p>
      </div>
    </div>
  );
};

export default Description;
