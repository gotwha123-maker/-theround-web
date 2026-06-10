const axios = require('axios');

async function verifyDeployment() {
    console.log('--- Deployment Verification Start ---');
    // Vercel project name usually strips special characters or follows a specific mapping
    // We will try the most likely production domains
    const urls = [
        'https://theroundyouth.org/api/settlement-news',
        'https://theround-web-next.vercel.app/api/settlement-news',
        'https://theround-web-v2.vercel.app/api/settlement-news'
    ];
    
    for (const targetUrl of urls) {
        try {
            console.log(`Checking Live API: ${targetUrl}`);
            const res = await axios.get(targetUrl, {
                headers: { 'Cache-Control': 'no-cache' },
                timeout: 5000
            });

            if (res.status === 200 && Array.isArray(res.data)) {
                const hasNaverNews = res.data.some(item => item.tag === '언론보도');
                const latestCount = res.data.length;

                console.log(`\n[Verification Result - SUCCESS]`);
                console.log(`- URL: ${targetUrl}`);
                console.log(`- Status: Online`);
                console.log(`- Total News Count: ${latestCount}`);
                console.log(`- Naver News Integration: ${hasNaverNews ? '✅ SUCCESS' : '❌ NOT FOUND (Cache?)'}`);
                
                if (hasNaverNews) {
                    const sample = res.data.find(item => item.tag === '언론보도');
                    console.log(`- Sample Naver News: ${sample.title}`);
                    return; // Exit on first success
                }
            }
        } catch (err) {
            console.log(`  ! ${targetUrl} failed: ${err.message}`);
        }
    }
    console.log('\nFinal Tip: If all URLs failed, Vercel might still be building the project. Please check the Vercel Dashboard for "-theround-web".');
}

verifyDeployment();
