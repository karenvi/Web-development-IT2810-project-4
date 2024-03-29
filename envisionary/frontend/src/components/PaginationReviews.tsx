import { Box, Grid, Pagination, Paper, Rating, Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { IReview } from "../types"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import PaginationFunctions from "../utils/PaginationFunctions";
import { ThemeContext } from "../App";
import { useRecoilState } from "recoil";
import { starOpacityRating } from "../states/states";
import { paginationReviewsStyle } from '../styles/StyleObjects';

interface Props {
    sortReviews: Array<IReview>;
    country: string;
}

function PaginationReviews({ sortReviews, country }: Props) {
    const { theme } = useContext(ThemeContext);
    const [paginationColor, setPaginationColor] = useState<string>("#ffffff");
    const [starOpacity, setStarOpacity] = useRecoilState<number>(starOpacityRating);
    const [onPage, setOnPage] = useState(1);
    let number = 0;

    // Pagination logic
    const handlePagination = (e: ChangeEvent<unknown>, p: number) => {
        dataPage.skip(p);
        setOnPage(p);
    }

    const elementsPerPage = 3; // How many commits to show on each page in the pagination
    const numberOfPages = Math.ceil(sortReviews.length / elementsPerPage); // How many pages to display in the pagination bar
    const dataPage = PaginationFunctions(sortReviews, elementsPerPage); // What data to display in the pagination

    // Theme
    const themeStyle = {...(theme === 'light' ? paginationReviewsStyle.light : paginationReviewsStyle.dark),}

    // Ensure that the stars are more visible in terms of opacity when user has dark mode enabled
    useEffect(() => {
        setPaginationColor(theme === 'dark' ? '#ffffff' : '#000000');
        setStarOpacity(theme === 'dark' ? 1 : 0.55);
    }, [theme]);

    return (
        <>
            {sortReviews.length === 0 // if country has no reviews
                ? <Typography>Nobody has reviewed {country} yet.</Typography>
                :
                <Box sx={{pl: "10px", pr: '10px', width: "100%"}}>
                    {dataPage.dataDisplaying().map((row: IReview) => (
                        <Paper variant="outlined" key={number++} sx={{ mb: 2 }} style={themeStyle}>
                            <Grid container spacing={2} p={2}>
                                <Grid item md={8} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Typography fontWeight='bold'>{row.Name}</Typography>
                                    <Typography mx={0.5}>rated it</Typography>
                                    <Rating name="read-only"
                                        value={row.Rating}
                                        precision={0.5}
                                        readOnly
                                        emptyIcon={<StarIcon style={{ opacity: starOpacity }} fontSize="inherit" />}
                                    />
                                </Grid>
                                <Grid item md={4} sx={{ display: 'flex', flexDirection: 'row', width: "100%", justifyContent: { xs: 'start', sm: 'start', md: 'end' } }}>
                                    <Typography align="right" sx={{ fontSize: "14px" }}>
                                        {new Date(row.Date).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
                                </Grid>
                                {row.ReviewText.length !== 0 // hide reviewtext if empty
                                    && <Grid item xs={12}>
                                        <Typography align="left">{row.ReviewText}</Typography>
                                    </Grid>}
                            </Grid>
                        </Paper>
                    ))}

                    {sortReviews.length > elementsPerPage // If there are more total reviews than we want per page, show buttons for navigating between pages (pagination)
                        && <Stack alignItems='center'>
                            <Pagination
                                count={numberOfPages}
                                page={onPage}
                                size="small"
                                onChange={handlePagination}
                                className="pagination"
                                aria-label="Pagination to see reviews"
                                shape="rounded"
                                showFirstButton
                                showLastButton
                                sx={{button:{color: paginationColor, backgroundColor: theme === 'dark' ? paginationReviewsStyle.dark.backgroundColor : paginationReviewsStyle.light.backgroundColor }}}
                            />
                            <Typography variant="body1" sx={{ m: '10px' }}>{onPage} of {numberOfPages}</Typography>
                        </Stack>}
                        </Box>}

        </>
    );
}
export default PaginationReviews;