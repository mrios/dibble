import React, { FC } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger: FC<{ url?: string }> = ({
  url = 'https://petstore.swagger.io/v2/swagger.json',
}) => {
  return (
    <div>
      <SwaggerUI url={url}></SwaggerUI>
    </div>
  );
};

Swagger.propTypes = {};

export default Swagger;
