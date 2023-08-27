<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/projectcatena/cloudlabs-app">
    <img src="https://i.postimg.cc/90t4QPxQ/Cloud-Labs-Logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CloudLabs</h3>

  <p align="center">
    Virtual labs on the cloud for academia.
    <br />
    <a href="https://projectcatena.github.io/cloudlabs-mkdocs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cloudlabs.one">View Demo</a>
    ·
    <a href="https://github.com/projectcatena/cloudlabs-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/projectcatena/cloudlabs-app/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://cloudlabs.one)

The CloudLabs project is an initiative sponsored by [Google Cloud Platform (GCP)](https://cloud.google.com/) that aims to create a secure environment in the cloud for tutors to distribute Virtual Machines (VMs) to students and allow students to access the VMs through their web browser. As such, the project reduces technical and compatibility issues that may arise due to the physical limitations in the hardware and software of students’ computers and encourages sustainable use of IT resources by migrating physical IT infrastructure to the cloud. 

By engaging in cloud services to run VMs, it enables the following:
* Reduction of spending for a machine with higher specifications
* Reduction of maintenance on machines
* Improvement in accessibility
* Reduction of energy consumption
* Easier installation & access to applications and software
* Scalability

Hence, this project will be able to enhance the overall learning experience and to promote environmental sustainability. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![Spring][Spring]][Spring-url]
* [![GCP][GCP]][GCP-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may setup the CloudLabs project locally for deployment or experimentation. To get a local copy up and running follow these simple example steps. <br />

**However**, do note that the compute instances that are provisioned will not be accessible through a local deployment, as instances are only assigned private IPv4 addresses. This prevents instances from being exposed to the public internet, and only authorized users are able to access the cloud-native instances through the web applciation.

<!--### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ``` -->

### Prerequisites

The required dependencies are as follow:
* npm
* [CloudLabs Backend](https://github.com/projectcatena/cloudlabs-server)
* Google Cloud Platform Account (authenticated with **Application Default Credentials**)

### Installation

1. Authenticate to GCP using the `gcloud` cli tool (follow the [official installation guide](https://cloud.google.com/sdk/docs/install) from GCP)
    ```bash
    gcloud auth application-default login
    ```
2. Clone the repo
   ```bash
   git clone https://github.com/projectcatena/cloudlabs-app.git
   ```
3. Install NPM packages
   ```bash
   npm install
   ```
4. Enter your URL for CloudLabs backend in `.env.local`
   ```js
   NEXT_PUBLIC_API_URL="http://localhost:8080" 
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This section details the main features of the CloudLabs web application along with some screenshots. The features mentioned below do not represent the entirety of the web application.

_For more examples, please refer to the [Documentation](https://example.com)_

### Architectural Diagram
![Architecture][Architecture]
The CloudLabs web application is deployed within a private Google Kubernetes Engine (GKE) autopilot cluster, and it will allow users to programmatically provision virtual machines that are in different subnets.

### Compute Engine
![Create-instance][Create-instance]
Authorized users with the TUTOR or ADMIN role are able to access a modal as seen above to create a compute instance with custom settings, including an image such as “debian-11” or “windows-server-2019”, and a subnet to be used by the compute instance.

### Subnet
![Create-subnet][Create-subnet]
Authorized users with the TUTOR or ADMIN role are able to access a modal as seen above to create a subnet resource, by specifying a name and an IPv4 network address in CIDR notation, such as /24 or /28. A firewall will also be created along with the subnet to enable virtual machines within the same subnet to communicate with one another as intranet traffic is denied by default.

### Snapshot
![Snapshot][Snapshot]
Users are able to create snapshots of compute instances to preserve the state of the virtual machines in the event of corruption or data loss.

### Browser-based Remote Access
![Browser-access][Browser-access]
Apache Guacamole is implemented to enable browser-based remote access to virtual machines, in which users are able to remotely connect and use compute instances that are provisioned on the cloud with just a web browser. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/projectcatena/cloudlabs-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kai - [@DancinParrot](https://github.com/DancinParrot)

<!-- name - [@twitter](https://twitter.com/handle) - email@email.com -->

Project Link: [https://github.com/projectcatena/cloudlabs-app](https://github.com/projectcatena/cloudlabs-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Our Supporters
We are eternally grateful to all our wonderful supporters and sponsors!

<p>

<a href="https://github.com/divyanmk"><img src="https://github.com/divyanmk.png" width="50px" alt="Dr Divyan" /></a>&nbsp;&nbsp;<a href="https://cloud.google.com"><img src="https://i.postimg.cc/NjMmY5jr/google-cloud-512x412.png" width="50px" alt="Dr Divyan" style="padding-bottom: 5px;" /></a>&nbsp;&nbsp;


<p align="right">(<a href="#readme-top">back to top</a>)</p>

</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Preline UI](https://preline.co/)
* [Google Cloud](https://cloud.google.com/)
* [Ngee Ann Polytechnic](https://www.np.edu.sg/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/projectcatena/cloudlabs-app.svg?style=for-the-badge
[contributors-url]: https://github.com/projectcatena/cloudlabs-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/projectcatena/cloudlabs-app.svg?style=for-the-badge
[forks-url]: https://github.com/projectcatena/cloudlabs-app/network/members
[stars-shield]: https://img.shields.io/github/stars/projectcatena/cloudlabs-app.svg?style=for-the-badge
[stars-url]: https://github.com/projectcatena/cloudlabs-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/projectcatena/cloudlabs-app.svg?style=for-the-badge
[issues-url]: https://github.com/projectcatena/cloudlabs-app/issues
[license-shield]: https://img.shields.io/github/license/projectcatena/cloudlabs-app.svg?style=for-the-badge
[license-url]: https://github.com/projectcatena/cloudlabs-app/blob/master/LICENSE.txt
[product-screenshot]: https://i.postimg.cc/fWpfLWmt/index.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Spring]: https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white 
[Spring-url]: https://spring.io/
[GCP]: https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white
[GCP-url]: https://cloud.google.com/
[Architecture]: https://i.postimg.cc/yxQTNzpd/CAP-Cloud-Labs-GCP-GKE-Cloudflare-Function-drawio.png 
[Create-instance]: https://i.postimg.cc/Gt573krH/create-instance.png
[Create-subnet]: https://i.postimg.cc/9Xbz8LFW/create-subnet.png
[Snapshot]: https://i.postimg.cc/4NzKvX7S/snapshot.png
[Browser-access]: https://i.postimg.cc/L8qYwjnn/browser-access.png 