from aiohttp import web
import json

def main():
    app = web.Application()
    app.add_routes(routes)
    web.run_app(app, host="localhost", port=8080)
    
routes = web.RouteTableDef()
@routes.get('/')
async def CALRootHandler(request):
    return web.Response(
        content_type="application/json",
        text=get_json_str_of_servers()
    )

def get_json_str_of_servers():
    #TODO: Call into CAL and check loaded CAL Nodes
    #TODO: Implement Jaris Heartbeat check
    LoadedCalServers = {
        "servers" : [{

        }]
    }
    return json.dumps(LoadedCalServers)

if __name__ == '__main__':
    main()