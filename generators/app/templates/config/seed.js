/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
<% if(filters.mongooseModels) { %>
<% if(filters.auth) { %>
import User from '../api/user/user.model';<% } %><% } %><% if(filters.sequelizeModels) { %>
import sqldb from '../sqldb';<% } %>
import config from './environment';

export default function seedDatabaseIfNeeded() {
    if(!config.seedDB) {
        return Promise.resolve();
    }

    <% if(filters.sequelizeModels) { %><% if(filters.auth) { %>
    let User = sqldb.User;<% } %><% } %>

    let promises = [];

<% if(filters.auth) { %>
    let userPromise = <% if(filters.mongooseModels) { %>User.find({}).remove()<% } if(filters.sequelizeModels) { %>User.destroy({ where: {} })<% } %>
        .then(() => {
            <% if(filters.mongooseModels) { %>return User.create({<% }
               if(filters.sequelizeModels) { %>return User.bulkCreate([{<% } %>
                provider: 'local',
                name: 'Test User',
                email: 'test@example.com',
                password: 'test'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin'
            <% if(filters.mongooseModels) { %>})<% }
              if(filters.sequelizeModels) { %>}])<% } %>
            .then(() => console.log('finished populating users'))
            .catch(err => console.log('error populating users', err));
        });
    promises.push(userPromise);<% } %>

    return Promise.all(promises);
}
