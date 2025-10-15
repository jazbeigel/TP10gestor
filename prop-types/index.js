const ANONIMO = "<componente>";

function getPropType(value) {
  if (Array.isArray(value)) return "array";
  if (value instanceof Date) return "date";
  return typeof value;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName = ANONIMO, location, propFullName) {
    const propValue = props[propName];
    if (propValue == null) {
      if (isRequired) {
        const nombre = propFullName || propName;
        const message = `La prop \`${nombre}\` es obligatoria en \`${componentName}\`.`;
        console.error(message);
        return new Error(message);
      }
      return null;
    }
    return validate(props, propName, componentName, location, propFullName || propName);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  return createChainableTypeChecker((props, propName, componentName, location, propFullName) => { // esto crea una función que comprueba que este la prop y si existe, llama a validate(...) para evaluar su tipo
    const propValue = props[propName];
    const propType = getPropType(propValue);
    if (propType !== expectedType) {
      const nombre = propFullName || propName;
      const message = `Prop \`${nombre}\` con tipo \`${propType}\` recibida en \`${componentName}\`, se esperaba \`${expectedType}\`.`;
      console.error(message);
      return new Error(message);
    }
    return null;
  });
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    console.error("Se esperaba un array en PropTypes.oneOf");
    return () => null;
  }
  return createChainableTypeChecker((props, propName, componentName, location, propFullName) => {
    const propValue = props[propName];
    if (!expectedValues.includes(propValue)) {
      const nombre = propFullName || propName;
      const message = `Prop \`${nombre}\` con valor \`${propValue}\` no permitido en \`${componentName}\`. Valores válidos: ${expectedValues.join(", ")}.`;
      console.error(message);
      return new Error(message);
    }
    return null;
  });
}

function createInstanceOfChecker(expectedClass) {
  return createChainableTypeChecker((props, propName, componentName, location, propFullName) => {
    const propValue = props[propName];
    if (!(propValue instanceof expectedClass)) {
      const nombre = propFullName || propName;
      const message = `Prop \`${nombre}\` en \`${componentName}\` debe ser instancia de ${expectedClass.name || "la clase indicada"}.`;
      console.error(message);
      return new Error(message);
    }
    return null;
  });
}

function createArrayOfTypeChecker(typeChecker) {
  return createChainableTypeChecker((props, propName, componentName, location, propFullName) => {
    const propValue = props[propName];
    if (!Array.isArray(propValue)) {
      const nombre = propFullName || propName;
      const message = `Prop \`${nombre}\` en \`${componentName}\` debe ser un array.`;
      console.error(message);
      return new Error(message);
    }
    for (let i = 0; i < propValue.length; i += 1) {
      const error = typeChecker(propValue, i, componentName, "prop", `${propFullName || propName}[${i}]`);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  });
}

function createShapeTypeChecker(shapeTypes) {
  return createChainableTypeChecker((props, propName, componentName, location, propFullName) => {
    const propValue = props[propName];
    if (propValue === null || typeof propValue !== "object" || Array.isArray(propValue)) {
      const nombre = propFullName || propName;
      const message = `Prop \`${nombre}\` en \`${componentName}\` debe ser un objeto.`;
      console.error(message);
      return new Error(message);
    }
    const keys = Object.keys(shapeTypes);
    for (const key of keys) {
      const checker = shapeTypes[key];
      if (typeof checker !== "function") continue;
      const error = checker(propValue, key, componentName, "prop", `${propFullName || propName}.${key}`);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  });
}

const PropTypes = {
  number: createPrimitiveTypeChecker("number"),
  string: createPrimitiveTypeChecker("string"),
  bool: createPrimitiveTypeChecker("boolean"),
  func: createPrimitiveTypeChecker("function"),
  array: createPrimitiveTypeChecker("array"),
  object: createPrimitiveTypeChecker("object"),
  oneOf: createEnumTypeChecker,
  instanceOf: createInstanceOfChecker,
  arrayOf: createArrayOfTypeChecker,
  shape: createShapeTypeChecker
};

export { PropTypes };
export default PropTypes;
