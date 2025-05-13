// package backend.com.code.cinemaebooking.filter;

// import backend.com.code.cinemaebooking.bean.User;

// import javax.servlet.*;
// import javax.servlet.annotation.WebFilter;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import java.io.IOException;

// /**
// * The AdminFilter is primarily a feature for intercepting unauthorized
// access.
// * When a user logs in, their information is stored in the session.
// * If the path contains 'admin', the filter retrieves the user information
// from
// * the session to determine access rights.
// * If the session is empty, the user has not logged in, and access is denied
// * with a redirect to the homepage.
// * If the session is not empty and the user has administrator privileges,
// access
// * is granted.
// */
// @WebFilter(filterName = "AdminFilter", urlPatterns = "/admin/*")
// public class AdminFilter implements Filter {

// @Override
// public void init(FilterConfig filterConfig) throws ServletException {

// }

// @Override
// public void doFilter(ServletRequest req, ServletResponse resp, FilterChain
// chain)
// throws IOException, ServletException {
// HttpServletRequest request = (HttpServletRequest) req;
// HttpServletResponse response = (HttpServletResponse) resp;
// User user = (User) request.getSession().getAttribute("user");

// if (user == null || !user.isAdmin()) {
// response.sendRedirect("../index.action");
// return;
// }

// chain.doFilter(req, resp);
// }

// @Override
// public void destroy() {

// }
// }