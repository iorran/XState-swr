import { createServer, Model, RestSerializer } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      nomination: Model,
    }, 

    serializers: {
      nomination: RestSerializer.extend({
        include: ["list"],
        embed: true,
      }),
    },
 
    routes() {
      this.namespace = "api"  
      this.resource("nominations") 
    },
  })

  return server
}