# AP-WAF: a Web Application Firewall for ActivityPub

AP-WAF is an extensible, low-level WAF for the [ActivityPub protocol](https://www.w3.org/TR/activitypub/).
Key features include configurable rules, low-level protocol access, and the ability to implement custom rules and plugins using JavaScript. The flexible design allows system administrators to quickly adapt to new threats and security needs without updating any actual server applications.

## Use Cases
* Implement security rules that are missing from server applications.
* Hotfix vulnerabilities without waiting for an official patch.
* Improve network logging and observability.
* Polyfill unsupported protocol features or extensions.

## Project Status

* [ ] Rules
  * [x] Rules API
  * [ ] Rule loader
* [ ] Domain model
  * [x] Basic proxy API
  * [x] Content-agnostic payload wrapper
  * [ ] ActivityStreams / ActivityPub parser
* [ ] Main pipeline
  * [x] Startup / builder
  * [x] Router
  * [ ] Request / response normalization
  * [ ] Payload conversion
  * [ ] Rules engine
* [ ] Proxy support
  * [ ] Forward proxy
  * [ ] Reverse proxy
* [ ] Security
  * [ ] Signature verification
  * [ ] Authorized Fetch enforcement
* [ ] Compatibility
  * [x] Strip LD-signatures
  * [ ] JSON-LD emulation
* [ ] Configuration
  * [x] Rules configuration
  * [ ] Proxy config
* [ ] Admin UI
