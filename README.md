# AWS 3-Tier Architecture (Saabiq)

This project demonstrates a classic three-tier architecture on AWS with a React web tier, a Node.js application tier, and a MySQL-compatible database tier.

![Three-Tier Architecture](https://miro.medium.com/v2/resize:fit:1200/1*NRYDvkKvCw4nToWGa-o7-g.png)

## Overview
The system is split into three layers:
1. **Web Tier**: Serves the front-end and forwards API requests.
2. **Application Tier**: Processes business logic and data access.
3. **Database Tier**: Stores and retrieves application data.

## Architecture Components
1. **Public Load Balancer**: Entry point for client traffic, distributes requests to web servers, and performs health checks.
2. **Web Tier**: Nginx serves the React build and proxies API calls to the internal load balancer.
3. **Internal Load Balancer**: Routes API traffic to application servers.
4. **Application Tier**: Node.js API handles requests and connects to the database.
5. **Database Tier**: Aurora MySQL (or MySQL-compatible) stores transactional data.

## Repository Structure
- `application-code/web-tier`: React front-end.
- `application-code/app-tier`: Node.js API service.
- `application-code/nginx.conf`: Nginx config for the web tier.
- `application-code/nginx-Without-SSL.conf`: Optional non-SSL config.
- `Implementation_Steps.md`: Deployment guide.

## Prerequisites
- AWS account with access to EC2, VPC, ALB, and RDS/Aurora.
- Node.js 16+ for building the web tier.
- Nginx on the web tier instances.

## Quick Start (Local)
From each tier directory, install dependencies:

```bash
cd application-code/app-tier
npm install

cd ../web-tier
npm install
npm run build
```

## Deployment Notes
See [Implementation_Steps.md](Implementation_Steps.md) for the full AWS setup steps, including load balancers, scaling, and database configuration.

## Maintainer
Saabiq
