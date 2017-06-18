from flask import Blueprint, render_template
from ..views import auth_view


def generate_blueprint(config):

    blueprint = Blueprint('gcp_images', __name__)

    blueprint.add_url_rule('/get-user-roles',
                           methods=['POST'],
                           view_func=auth_view.GetUserRoles.
                           as_view('GetUserRoles'))

    return blueprint
