import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger = (props: any) => {
  return (
    <div>
      <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json"></SwaggerUI>
    </div>
  );
};

Swagger.propTypes = {};

export default Swagger;
