export function createSandbox(code) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    let logs = [];
    
    try {
      // Create a secure console wrapper
      const secureConsole = {
        log: (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        },
        error: (...args) => {
          logs.push('Error: ' + args.join(' '));
        },
        warn: (...args) => {
          logs.push('Warning: ' + args.join(' '));
        }
      };

      const evaluator = new Function('console', `
        "use strict";
        ${code}
      `);
      evaluator(secureConsole);
      
      const executionTime = Math.round(performance.now() - startTime);
      
      resolve({
        result: logs.join('\n'),
        error: null,
        executionTime
      });
    } catch (error) {
      const executionTime = Math.round(performance.now() - startTime);
      resolve({
        result: logs.join('\\n'),
        error: error.message,
        executionTime
      });
    }
  });
}