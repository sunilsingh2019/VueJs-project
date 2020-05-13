import userRepository from "./repositories/user";
import roleRepository from "./repositories/role";
import permissionRepository from "./repositories/permission";
import clientRepository from "./repositories/client";
import impersonateRepository from "./repositories/impersonate";

import vehicleRepository from "./repositories/vehicle";
import cityRepository from "./repositories/city";
import routeRepository from "./repositories/route";
import bookingRepository from "./repositories/booking";
import authRepository from "./repositories/auth";
import homeRepository from "./repositories/home";
import userBookingRepository from "./repositories/user_booking";

const RepositoryInterface = {
    get() {},
    find(id) {},
    update(id, payload) {},
    create(payload) {},
    delete(id) {},
    invite(email) {},
    impersonate(id) {},
    getDefaultRole(role) {},

    summary(client) {},
    filter(client, payload) {},
    getCampaigns(client) {},
    getResponseSummary(client) {},
    getFilters() {},

    getSeats(payload) {},
    saveSeats(payload) {},
    getVehicles() {},
    saveBooking(payload) {},
    paymentResponse(id){},
    paymentDetails(id){},
    getTicket(id){},
    getBookingForCounter() {},
    getSeatStats(id, date) {},
    getMyBooking(payload) {},
    login(payload) {},
    register(payload) {},
    logout() {},

    getTestimonials() {},
    getFeatures() {},
    getClients() {},

    search(payload) {},

    changeStatus(id, status) {},

    getActiveVehicles() {},
    retrieveChalani(vehicle, date) {},
    getVehicleLayoutSettings(id) {}
};

const PermissionRepositoryInterface = {
    get() {},
    find(id) {},
    update(id, payload) {},
    create(payload) {},
    delete(id) {},
    list() {}
};

function bind(repositoryName, Interface) {
  return {
    ...Object.keys(Interface).reduce((prev, method) => {
      const resolveableMethod = async (...args) => {
        const repository = await import(`./repositories/${repositoryName}`);
        return repository.default[method](...args);
      };
      return { ...prev, [method]: resolveableMethod };
    }, {})
  };
}

// This is the place where you set up all
// of your dependencies. You can switch
// repositories or change the implementation
// details of a repository without having to
// touch all of the components which use it.
export default {
    homeRepository: bind("home", RepositoryInterface),
    authRepository: bind("auth", RepositoryInterface),
    vehicleRepository: bind("vehicle", RepositoryInterface),
    routeRepository: bind("route", RepositoryInterface),
    cityRepository: bind("city", RepositoryInterface),
    scheduleRepository: bind("schedule", RepositoryInterface),
    bookingRepository: bind("booking", RepositoryInterface),
    userBookingRepository: bind("user_booking", RepositoryInterface),
};
