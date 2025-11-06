/**
 * Utility functions for validating 3D models and preventing NaN geometry errors
 */

// Cache validation results to avoid re-validating the same scene
const validationCache = new WeakMap();

/**
 * Validates a Three.js scene for NaN values in geometry positions
 * Uses caching to avoid redundant validation of the same scene object
 * @param {THREE.Scene} scene - The Three.js scene to validate
 * @returns {Object} - Validation result with isValid boolean and details
 */
export const validateScene = (scene) => {
  if (!scene) {
    return { isValid: false, errors: ["Scene is null or undefined"] };
  }

  // Check cache first to avoid expensive re-validation
  const cached = validationCache.get(scene);
  if (cached) {
    return cached;
  }

  const errors = [];
  let hasNaN = false;

  scene.traverse((child) => {
    if (child.geometry && child.geometry.attributes.position) {
      const positions = child.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i])) {
          hasNaN = true;
          errors.push(
            `NaN found in ${child.name || "unnamed"} geometry at index ${i}`
          );
          break;
        }
      }
    }
  });

  const result = {
    isValid: !hasNaN,
    errors: errors.length > 0 ? errors : [],
  };

  // Cache the result for future calls
  validationCache.set(scene, result);

  return result;
};

/**
 * Safely loads a GLTF model with validation
 * @param {string} path - Path to the GLTF file
 * @param {Function} useGLTF - The useGLTF hook from @react-three/drei
 * @returns {Object} - The loaded model or null if invalid
 */
export const safeLoadModel = (path, useGLTF) => {
  try {
    const model = useGLTF(path);

    if (model && model.scene) {
      const validation = validateScene(model.scene);

      if (!validation.isValid) {
        console.warn(`Model validation failed for ${path}:`, validation.errors);
        return null;
      }

      return model;
    }

    return null;
  } catch (error) {
    console.error(`Error loading model ${path}:`, error);
    return null;
  }
};

/**
 * Creates a fallback geometry when a model fails to load
 * @returns {THREE.Mesh} - A simple fallback mesh
 */
export const createFallbackMesh = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x915eff,
    wireframe: true,
  });
  return new THREE.Mesh(geometry, material);
};

/**
 * Debounced error logging to prevent spam
 */
let errorLogTimeout = null;
export const logModelError = (component, error) => {
  if (errorLogTimeout) {
    clearTimeout(errorLogTimeout);
  }

  errorLogTimeout = setTimeout(() => {
    console.error(`[${component}] Model error:`, error);
  }, 1000);
};
