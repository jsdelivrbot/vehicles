import argparse

from .. import application


def main():
    """Start a development server with auto-reload."""
    parser = argparse.ArgumentParser(
        description='Run a development server.',
    )
    parser.add_argument(
        '--host',
        help='The host or IP to bind to. Defaults to 0.0.0.0.',
        default='0.0.0.0'
    )
    parser.add_argument(
        '--port',
        help='The port for the service to listen on. Defaults to 8888.',
        default=8888,
        type=int,
    )
    parser.add_argument(
        '--config',
        help='The Flask configuration object to load.',
        default='vehicles.config.dev',
    )

    args, _ = parser.parse_known_args()

    application.generate_application(
        config=args.config,
    ).run(host=args.host, port=args.port, debug=True)
