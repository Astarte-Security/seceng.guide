# Nmap

Similar to Nuclei and ZAP, we can use Nmap to scan our target hosts. 

In this case, we'll be using a custom bash script within our Action that runs the scan, then converts the findings into a PDF file that we can access from the Action's attached artifacts.

## Setup

1. Create a new file called `.github/workflows/nmap-scanner.yml`

2. Add the following contents:

```
name: Nmap - Vulnerability Scan

on: 
  #schedule:
  #  - cron: "22 17 * * 2" # At 17:22 on Monday UTC time (1:22 PM EST)
  workflow_dispatch:

jobs:
  nmap-scanner:
    runs-on: ubuntu-latest
    name: Nmap Scanner
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: main
      - name: Install Nmap and relevant packages
        run: |
         # Install packages:
         # Nmap is used for running the scan
         # xsltproc is used to convert the XML output file into HTML
         # wkhtmltopdf is used to convert the HTML file into a PDF
         sudo apt update && sudo apt -qq install nmap xsltproc wkhtmltopdf
      - name: Scan External Assets
        run: |
         # Scans targets under /assets/scan-targets.txt in the repo
         # Fast scan:
         echo -e "--------------------------------\n\033[32mScanning target IPs...\033[0m"
         sudo nmap -oA /tmp/scanResults -v0 -sV -sC -sS -Pn -T4 --script vulners --top-ports 10 jester.social 
         # Fail the script if there are no results found or no IPs were scanned
         echo -e "--------------------------------\n\033[32mChecking scan results for failures...\033[0m"
         grep "WARNING: No targets were specified, so 0 hosts scanned." /tmp/*scanResults* && exit 2
         grep "0 IP addresses (0 hosts up)" /tmp/*scanResults* && exit 3
         # Convert the XML output file to HTML
         echo -e "--------------------------------\n\033[32mConverting scan output to HTML...\033[0m"
         xsltproc /tmp/scanResults.xml -o /tmp/scanResults.html
         # Convert the HTML file to a PDF
         echo -e "--------------------------------\n\033[32mConverting HTML output to PDFs...\033[0m"
         wkhtmltopdf /tmp/scanResults.html /tmp/Nmap_NetworkScan_$(date "+%Y-%m-%d").pdf
         echo -e "--------------------------------\n\033[32mSUCCESS:\033[0m Nmap scan complete!"
      - name: Upload Scan Results
        uses: actions/upload-artifact@v4
        with:
          name: nmap-report
          path: /tmp/*NetworkScan*
          retention-days: 15
```

## Running a scan

1. Navigate to the **Actions** tab of your repo, click on **Nmap - Vulnerability Scan** in the left pane, and then **Run workflow**.


2. Wait for the scan to finish (this is a quick scan of the top 10 ports, so it should take less than two minutes).


3. Once the scan is complete, in the Actions page, click on the latest run as in the screenshot below:


<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/165ad764-9bae-4925-bc81-f7969a0c40a0"
  alt=""
  width=""
  height=""
/>


4. At the bottom of the page, you'll see an **Artifacts** section, where we've attached scan results. They are in a ZIP file you'll have to download:


<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/26a2d2fc-162e-4b67-8e34-989f7205f648"
  alt=""
  width=""
  height=""
/>


5. The ZIP file contains a PDF with your scan results:


<img
  src="https://images.coursestack.com/e2f506a9-6c81-4974-9f04-3e2c6409abcc/e37809f0-cec9-4e38-8371-5f625e8a65fa"
  alt=""
  width=""
  height=""
/>
